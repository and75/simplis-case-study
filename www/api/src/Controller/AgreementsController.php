<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Agreements;
use App\Entity\Customers;
use App\Entity\Activities;
use DateTime;

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

    #[Route('/agreements', name: 'app_agreements')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AgreementsController.php',
        ]);
    }

    /**
     * Method index
     *
     * @param EntityManagerInterface $entityManager [explicite description]
     *
     * @return JsonResponse
     */
    #[Route('/agreements/all', name: 'api_customers_index')] 
    public function all(): JsonResponse
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
    #[Route('/agreements/find', name: 'api_activities_find', methods:[''])] 
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
    #[Route('/customers/save', name: 'api_activities_find', methods:['Post'])]  
    public function save(Request $request): JsonResponse{
        try{
            $data = $request->query->get('data');

            $customer = $this->em->getRepository(Customers::class)->find($data["customer_id"]);
            $activity = $this->em->getRepository(Activities::class)->find($data["activity_id"]);
            $date = new DateTime;

            $agreements = new Agreements();
            $agreements->setCustomer($customer);
            $agreements->setActivity($activity);
            $agreements->setDate($date);
            $agreements->setTime(time());

            $this->em->persist($customer);
            $this->em->flush();

            return $this->setResponse(true, 'The entity was created successfully', $customer->getId());
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }

}
