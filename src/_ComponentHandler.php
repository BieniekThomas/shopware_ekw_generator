<?php

namespace ecEkwDepartment\ComponentHandler;

use Shopware\Bundle\EmotionBundle\ComponentHandler\ComponentHandlerInterface;
use Shopware\Bundle\EmotionBundle\Struct\Collection\PrepareDataCollection;
use Shopware\Bundle\EmotionBundle\Struct\Collection\ResolvedDataCollection;
use Shopware\Bundle\EmotionBundle\Struct\Element;
use Shopware\Bundle\StoreFrontBundle\Struct\ShopContextInterface;

class ecEkwDepartmentHandler implements ComponentHandlerInterface
{
    /**
     * @param Element $element
     * @return bool
     */
    public function supports(Element $element)
    {
        return $element->getComponent()->getTemplate() === 'ec_ekw_department';
    }

    /**
     * @param PrepareDataCollection $collection
     * @param Element $element
     * @param ShopContextInterface $context
     */
    public function prepare(PrepareDataCollection $collection, Element $element, ShopContextInterface $context)
    {

    }

    /**
     * @param ResolvedDataCollection $collection
     * @param Element $element
     * @param ShopContextInterface $context
     */
    public function handle(ResolvedDataCollection $collection, Element $element, ShopContextInterface $context)
    {

    }
}