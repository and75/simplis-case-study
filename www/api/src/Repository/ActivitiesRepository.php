<?php

namespace App\Repository;

use App\Entity\Activities;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Activities>
 *
 * @method Activities|null find($id, $lockMode = null, $lockVersion = null)
 * @method Activities|null findOneBy(array $criteria, array $orderBy = null)
 * @method Activities[]    findAll()
 * @method Activities[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivitiesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Activities::class);
    }


    public function searchByName(string $value): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
                SELECT * FROM activities a
                LEFT JOIN prices p ON a.price_id=p.id
                WHERE a.name LIKE :searchTerm
                ORDER BY a.name ASC
                ';

        $resultSet = $conn->executeQuery($sql, ['searchTerm' => '%' . $value . '%']);

        // returns an array of arrays (i.e. a raw data set)
        return $resultSet->fetchAllAssociative();
    }


    
    //    /**
    //     * @return Activities[] Returns an array of Activities objects
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

    //    public function findOneBySomeField($value): ?Activities
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
