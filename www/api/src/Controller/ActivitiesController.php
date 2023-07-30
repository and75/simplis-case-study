<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Activities;


class ActivitiesController extends MainController
{
    
    /**
     * Method formatActivities
     *
     * @param $data $data [explicite description]
     *
     * @return array
     */
    public function formatActivities($activities, $single=false):array{
        
        $data = [];
        if(!empty($activities)){
            if(!$single){
                foreach($activities as $activity){
                    $data[] = [
                        'id'=>$activity->getId(),
                        'name'=>$activity->getName(),
                        'coverage'=>$activity->getCoverage(),
                        'price'=>$activity->getPrice()->getPriceTt()
                    ];
                }
            } else{
                $data[] = [
                    'id'=>$activities->getId(),
                    'name'=>$activities->getName(),
                    'coverage'=>$activities->getCoverage(),
                    'price'=>$activities->getPrice()->getPriceTt()
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
    #[Route('/activities', name: 'api_activities_index')] 
    public function index(): JsonResponse
    {
        try {
            $activities = $this->em->getRepository(Activities::class)->findAll();
            $data = $this->formatActivities($activities);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Found activities', $data);
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
    #[Route('/activities/search', name: 'api_activities_search', methods:['GET'])] 
    public function find(Request $request): JsonResponse{
        try {
            $query = $request->query->get('q');
            $activities = $this->em->getRepository(Activities::class)->searchByName($query);
            if(empty($activities)){
                return $this->setResponse(false, 'Not Found', $activities, 404 );
            }
            return $this->setResponse(true, 'Found', $activities);
        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500 );
        }
    }

}