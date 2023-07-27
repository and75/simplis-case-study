<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Activities;
use App\Entity\Prices;
use DateTime;

class PopulateController extends MainController
{

    /**
     * The price data
     */
    private $prices = [
        [
            'price'=> 6.99,
            "price_tt" => 9.99
        ],
        [
            'price'=> 12.99,
            "price_tt" => 19.99
        ]
    ];

    /**
     * Activities data
     */
    private $activities = [
        [
            "name" => "Accordage d'instruments de musique (piano, etc.)",
            "coverage" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            "price" => 1,
        ],
        [
            "name" => "Achat de coupe de bois, transformation et vente de bois de chauffage",
            "coverage" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            "price" => 2,
        ],
        [
            "name" => "Adaptation de partitions",
            "coverage" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            "price" => 1,
        ],
        [
            "name" => "Travaux de plomberies",
            "coverage" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            "price" => 2,
        ]
    ];

    /**
     * The return value of populate action
     */
    public $populated = [];


    #[Route('/populate', name: 'api_populate_db')]
    public function index(): JsonResponse
    {

        //Set date an UnixtimeStamp
        $date = new DateTime;
        $time = time();

        /**
         * Populate price
         */
        try {
            foreach ($this->prices as $p) {
                $pr = new Prices();
                $pr->setPrice($p['price']);
                $pr->setPriceTt($p['price_tt']);
                $pr->setTimeCreated($time);
                $pr->setDateCreated($date);
                $this->em->persist($pr);
                $this->em->flush();
                $this->populated['price'][] = ['id' => $pr->getId(), 'price' => $pr->getPrice(), 'price_tt' => $pr->getPriceTt()];
            }
        } catch (\Exception $e) {
            return $this->setResponse(false, $e->getMessage(), [], 500);
        }


        /**
         * Populate activities
         */
        try {

            foreach ($this->activities as $d) {
                $ac = new Activities();
                $ac->setName($d["name"]);
                $ac->setCoverage($d["coverage"]);
                $ac->setTimeCreated($time);
                $ac->setDateCreated($date);
                $ac->setPrice($this->em->getRepository(Prices::class)->find($d['price']));
                $this->em->persist($ac);
                $this->em->flush();
                $this->populated['activities'][] = ['id' => $ac->getId(), 'name' => $ac->getName(), 'price' => $ac->getPrice()->getPriceTt()];
            }
        } catch (\Exception $e) {

            return $this->setResponse(false, $e->getMessage(), [], 500);
        }

        return $this->setResponse(true, 'Populate DB ok!', $this->populated);
    }
}
