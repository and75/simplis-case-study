<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Customers;

class CustomersController extends MainController
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
                    $obj instanceof Customers;
                    $data[] = [
                        'id'=>$obj->getId(),
                        'name'=>$obj->get,
                        'coverage'=>$obj->getCoverage()
                    ];
                }
            } else{
                $data[] = [
                    'id'=>$customers->getId(),
                    'name'=>$customers->getName(),
                    'coverage'=>$customers->getCoverage()
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
    #[Route('/customers', name: 'api_customers_index')] 
    public function index(): JsonResponse
    {
        try {
            $customers = $this->em->getRepository(Customers::class)->findAll();
            $data = $this->formatData($customers);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Found %s customers', $data);
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), $data, 500 );
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
    #[Route('/customers/find', name: 'api_activities_find', methods:[''])] 
    public function find(Request $request): JsonResponse{
        try {
            
            $id = $request->query->get('id');
            $activities = $this->em->getRepository(Activities::class)->find($id);
            $data = $this->formatData($activities, true);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Not Found', $data);
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), $data, 500 );
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
            
            $customer = new Customers();
            $customer->setRaisonSociale($data["raison_sociale"]);
            $customer->setSiret($data["siret"]);
            $customer->setAdressePostale($data["adresse_postale"]);
            $customer->setEmail($data["email"]);
            $customer->setTelephone($data['telephone']);

            $this->em->persist($customer);
            $this->em->flush();

            return $this->setResponse(true, 'The entity was created successfully', $customer->getId());
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }
}
