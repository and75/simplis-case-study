<?php

namespace App\Repository;

use App\Entity\Agreements;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Agreements>
 *
 * @method Agreements|null find($id, $lockMode = null, $lockVersion = null)
 * @method Agreements|null findOneBy(array $criteria, array $orderBy = null)
 * @method Agreements[]    findAll()
 * @method Agreements[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AgreementsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Agreements::class);
    }

//    /**
//     * @return Agreements[] Returns an array of Agreements objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Agreements
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
