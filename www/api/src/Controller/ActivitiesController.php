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
                        'coverage'=>$activity->getCoverage()
                    ];
                }
            } else{
                $data[] = [
                    'id'=>$activities->getId(),
                    'name'=>$activities->getName(),
                    'coverage'=>$activities->getCoverage()
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
    #[Route('/activities/find', name: 'api_activities_find', methods:['GET'])] 
    public function find(Request $request): JsonResponse{
        try {
            
            $id = $request->query->get('id');
            $activities = $this->em->getRepository(Activities::class)->find($id);
            $data = $this->formatActivities($activities, true);
            if(empty($data)){
                return $this->setResponse(false, 'Not Found', $data, 404 );
            }
            return $this->setResponse(true, 'Not Found', $data);

        }
        catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), $data, 500 );
        }
    }
}
