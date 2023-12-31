<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

use App\Entity\Agreements;
use App\Entity\Customers;
use App\Entity\Activities;
use DateTime;
use Dompdf\Dompdf;

class AgreementsController extends MainController
{
    /**
     * Method formatActivities
     *
     * @param $data $data [explicite description]
     *
     * @return array
     */
    public function formatData($customers, $single=false):array{
        $data = [];
        if(!empty($customers)){
            if(!$single){
                foreach($customers as $obj){
                    $data[] = [
                        'id'=>$obj->getId(),
                        'customers'=>$obj->getCustomer(),
                        'activity'=>$obj->getActivity()
                    ];
                }
            } else{
                $data[] = [
                    'id'=>$customers->getId(),
                    'customers'=>$customers->getCustomer(),
                    'activity'=>$customers->getActivity()
                ];
            }
        } 
        return $data;
    }

    /**
     * Method index
     *
     * @param EntityManagerInterface $entityManager [explicite description]
     *
     * @return JsonResponse
     */
    #[Route('/agreements', name: 'api_agreements_index', methods:['Get'])] 
    public function index(): JsonResponse
    {
        try {
            $agreements = $this->em->getRepository(Agreements::class)->findAll();
            $data = $this->formatData($agreements);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Found %s agreements', $data);
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }

    /**
     * Method find
     *
     * @param EntityManagerInterface $entityManager [explicite description]
     * @param string $q [explicite description]
     *
     * @return JsonResponse
     */
    #[Route('/agreements/find', name: 'api_agreements__find', methods:['Get'])] 
    public function find(Request $request): JsonResponse{
        try {
            
            $id = $request->query->get('id');
            $agreement = $this->em->getRepository(Agreements::class)->find($id);
            $data = $this->formatData($agreement, true);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Not Found', $data);
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }

    /**
     * Method save
     *
     * @param Request $request [explicite description]
     *
     * @return JsonResponse
     */
    #[Route('/agreements/save', name: 'api_agreements_save', methods:['Post'])]  
    public function save(Request $request): JsonResponse{
        try{
            $data = $request->query->get('data');

            $customer = $this->em->getRepository(Customers::class)->find($data["customer_id"]);
            $activity = $this->em->getRepository(Activities::class)->find($data["activity_id"]);
            
            $date = new DateTime;
            $time = time();

            $agreements = new Agreements();
            $agreements->setCustomer($customer);
            $agreements->setActivity($activity);
            $agreements->setDateCreated($date);
            $agreements->setTimeCreated($time);
            $agreements->setStatus('devis');
            $this->em->persist($agreements);
            $this->em->flush();

            return $this->setResponse(true, 'The entity was created successfully', $customer->getId());
        
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }

    /**
     * Method pdf
     *
     * @param Request $request [explicite description]
     *
     * @return StreamedResponse
     */
    #[Route('/agreements/pdf', name: 'api_agreements_pdf', methods:['Get'])]  
    public function pdf(Request $request): StreamedResponse{
         
        $id = $request->query->get('id');

        /**
         * Get Agreements
         */
        $agreement = $this->em->getRepository(Agreements::class)->findOneBy(['id' => $id]);
        if (!$agreement) {
            $this->setResponse(false, 'No agreement found for id '.$id, 404);
        }

        
        /**
         * Prepare stream of PDF
         */
        $response = new StreamedResponse();
        $response->headers->set('Content-Type', 'application/pdf');

        /**
         * Set Dompdf
         */
        $dompdf = new Dompdf();
        
        $response->setCallback(function() use ($dompdf, $agreement) {

            $data = [
                'imageSrc'  => $this->imageToBase64($this->getParameter('kernel.project_dir') . '/public/assets/img/simplis-logo-small.png'),
                'number'    => $agreement->getId(),
                'date'      => date('m/d/Y', $agreement->getTimeCreated()),
                'name'         => $agreement->getCustomer()->getRaisonSociale(),
                'address'      => $agreement->getCustomer()->getAdressePostale(),
                'siret'        => $agreement->getCustomer()->getSiret(),
                'mobileNumber' => $agreement->getCustomer()->getTelephone(),
                'email'        => $agreement->getCustomer()->getEmail(),
                'activity'     => $agreement->getActivity()->getName(),
                'coverage'     => $agreement->getActivity()->getCoverage(),
                'price'     => $agreement->getActivity()->getPrice()->getPriceTt(),
            ];
            $html =  $this->renderView('pdf/agreements.html.twig', $data);
            $dompdf = new Dompdf();
            $dompdf->loadHtml($html);
            $dompdf->render();
            $dompdf->stream('resume', ["Attachment" => false]);
        });
        return $response;
    }
}
