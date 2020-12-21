<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

use craft\helpers\App;

return [
    // Global settings
    '*' => [
        'defaultWeekStartDay' => 0,    // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'enableCsrfProtection' => true,    // Enable CSRF Protection
        'generateTransformsBeforePageLoad' => true,
        'omitScriptNameInUrls' => true,    // Whether generated URLs should omit "index.php"
        'cpTrigger' => 'admin',    // Control Panel trigger word
        'securityKey' => App::env('SECURITY_KEY'),    // The secure key Craft will use for hashing and encrypting data
        'transformGifs' => false,    // Disable transforms for gifs
        'defaultImageQuality' => 75,    // Set default image quality
        'enableTemplateCaching' => false,    // Disable template caching because Blitz handles it
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',    # Set the resources base path (fixes cli issue)
        'aliases' => [    // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
            '@previewProduction' => App::env('PRIMARY_SITE_URL') . '/api/preview?uri={uri}',
            '@previewLocal' => 'http://localhost:3000/api/preview?uri={uri}',
            '@uploadsBasePath' => getenv('UPLOADS_BASE_PATH'),
            '@uploadsBaseUrl' => getenv('UPLOADS_BASE_URL'),
        ],
        'devMode' => false,    // Disable devMode
        'allowUpdates' => false,    // Disallow running updates
        'allowAdminChanges' => true,    // Disallow admin changes
        'backupOnUpdate' => true,    // Enable running backups when updating
        'disallowRobots' => true,    // Prevent crawlers from indexing pages and following links
        'headlessMode' => true,    // Enable headless mode
        'enableGraphQlCaching' => false,    // Enable GraphQL caching
        'tokenParam' => 'token'    // Set query string parameter name of Craft tokens
    ],

    // Dev environment settings
    'dev' => [
        'devMode' => true,
        'allowUpdates' => true,
        // 'allowAdminChanges' => true,
        'disabledPlugins' => [
            // 'blitz',
        ],
    ],

    // Staging environment settings
    'staging' => [
        'disabledPlugins' => [
            // 'blitz',
        ],
    ],

    // Production environment settings
    'production' => [
        'enableGraphQlCaching' => true,    // Enable GraphQL caching
    ],
];
