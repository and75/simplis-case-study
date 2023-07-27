<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

class MainController extends AbstractController
{
    protected EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        date_default_timezone_set('Europe/Paris');
        $this->em = $em;
    }

    /**
     * @param $status
     * @param $message
     * @param $data
     * @param int $httpStatusCode
     * @return JsonResponse
     */
    public function setResponse($status, $message, $data, int $httpStatusCode = 200): JsonResponse
    {
        return $this->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $httpStatusCode);
    }
    
    /**
     * Method imageToBase64
     *
     * @param $path $path [explicite description]
     *
     * @return string
     */
    protected function imageToBase64(string $pathToImg):string {
        $type = pathinfo($pathToImg, PATHINFO_EXTENSION);
        $data = file_get_contents($pathToImg);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }
}
