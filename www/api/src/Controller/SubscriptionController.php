<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Activities;
use App\Entity\Customers;
use App\Entity\Agreements;
use DateTime;

class SubscriptionController extends MainController
{
    #[Route('/subscription/save', name: 'app_subscription_save', methods:['Post', 'Get'])]
    public function save(Request $request): JsonResponse
    {
        try{

            /**
             * Set time value
             */
            $dateTime = new DateTime();
            $time = time();

            /**
             * GEt data from request
             */
            $data = $request->request->all();
            $sub = json_decode($data['subscription']);
            
            /**
             * Check integrity of data
             */
            if(empty($sub->activity) || empty($sub->customer) ){
                return $this->setResponse(false, 'Some data is missing, unable to register subscription', $sub, 400);
            }

            /**
             * Save Customers data
             */
            $customer = new Customers();
            $customer->setRaisonSociale($sub->customer->raison_sociale);
            $customer->setSiret($sub->customer->siret);
            $customer->setAdressePostale($sub->customer->adresse_postale);
            $customer->setEmail($sub->customer->email);
            $customer->setTelephone($sub->customer->telephone);
            $customer->setDateCreated($dateTime);
            $customer->setTimeCreated($time);
            $this->em->persist($customer);
            $this->em->flush();

            /**
             * Create Agreements
             */
            $agreem = new Agreements();
            $agreem->setCustomer($customer);
            $agreem->setActivity($this->em->getRepository(Activities::class)->find($sub->activity->id));
            $agreem->setDateCreated($dateTime);
            $agreem->setTimeCreated($time);
            $agreem->setStatus('devis');

            $this->em->persist($agreem);
            $this->em->flush();

            /**
             * !ToDo!
             * Prepare PDF as services
             * The service store the PDF on local folder and return the url or id for secure download
             */

             /**
              * Update subscription object to resend 
              */
             $sub->customer->id  = $customer->getId();
             $sub->agreement = $agreem->getId();
             //$sub->agreement->date = $agreem->getDateCreated();
             $sub->treated = true;

            return $this->setResponse(true, 'Report test', $sub);
        }
        catch(\Exception $e){
            return $this->setResponse(false, $e->getMessage(), $data, 500);
        }
        
    }
}
