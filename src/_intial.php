<?php

namespace ecEkwDepartment;

use Shopware\Components\Model\ModelManager;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UninstallContext;
use Shopware\Models\Emotion\Library\Component;
use Shopware\Models\Plugin\Plugin;

/**
 * Class ecEkwDepartment
 * @package ecEkwDepartment
 */
class ecEkwDepartment extends \Shopware\Components\Plugin
{

    /**
     * @param InstallContext $context
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function install(InstallContext $context)
    {
        $component = $this->createEmotionComponent($context->getPlugin(), [
            'name' => 'Fachabteilungen-Modul',
            'xtype' => 'emotion-components-base',
            'template' => 'ec_ekw_department',
            'cls' => 'ec-ekw-department',
            'description' => 'EKW-Marketinfo-Modul'
        ]);

        $component->createDisplayField([
            'name' => 'info_field',
            'defaultValue' => 'Hake die Fachabteilungen an, welche sich in diesem Erlebnismarkt befinden',
            'fieldLabel' => 'Info'
        ]);

        $component->createTextField([
            'name' => 'headline',
            'fieldLabel' => 'Headline',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'hunde_welt',
            'fieldLabel' => 'Hunde Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'katzen_welt',
            'fieldLabel' => 'Katzen Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'kleintier_welt',
            'fieldLabel' => 'Kleintier Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'suesswasser_welt',
            'fieldLabel' => 'Süßwasser Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'meerwasser_welt',
            'fieldLabel' => 'Meerwasser Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'teich_welt',
            'fieldLabel' => 'Teich Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'vogel_welt',
            'fieldLabel' => 'Vogel Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'wildvogel_welt',
            'fieldLabel' => 'Wildvogel Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'terraristik_welt',
            'fieldLabel' => 'Terraristik Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'pferde_welt',
            'fieldLabel' => 'Pferde Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'geschenke_welt',
            'fieldLabel' => 'Geschenke Welt',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'veterinaer',
            'fieldLabel' => 'Veterinär',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'hunde_salon',
            'fieldLabel' => 'Hunde Salon',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'apotheke',
            'fieldLabel' => 'Apotheke',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'koelle_cafe',
            'fieldLabel' => 'Kölle Cafe',
            'allowBlank' => true
        ]);

        $component->createCheckboxField([
            'name' => 'wasser_welt',
            'fieldLabel' => 'Wasser Welt',
            'allowBlank' => true
        ]);

        /** @var ModelManager $em */
        $em = $this->container->get('models');
        $em->persist($component);
        $em->flush();

        $context->scheduleClearCache(InstallContext::CACHE_LIST_ALL);
    }

    /**
     * @param UninstallContext $context
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function uninstall(UninstallContext $context)
    {
        $context->scheduleClearCache(UninstallContext::CACHE_LIST_ALL);
    }

    /**
     * @param $options
     * @param Plugin $pluginModel
     * @return Component
     */
    protected function createEmotionComponent(Plugin $pluginModel, $options)
    {
        /** @var ModelManager $em */
        $em = $this->container->get('models');

        // if a component with this name already exists for this plugin, use that
        $component = $em->getRepository(Component::class)->findOneBy([
            'name' => $options['name'],
            'pluginId' => $pluginModel->getId()
        ]);

        // else: create a new component
        if (!$component) {
            $component = new Component();
        }

        $component->fromArray($options);

        $component->setPluginId($pluginModel->getId());
        $component->setPlugin($pluginModel);

        return $component;
    }
}
