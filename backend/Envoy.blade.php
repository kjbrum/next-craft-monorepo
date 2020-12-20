##################################################
# Setup
##################################################
@setup
	require __DIR__.'/vendor/autoload.php';

	# Set the environment
    if ( ! isset( $env ) ) {
        if ( $production ) $env = 'production';
        if ( $staging ) $env = 'staging';
    }

    # Check for allowed environment
	if ( ! isset( $env ) || ($env !== 'staging' && $env !== 'production') ) {
        throw new Exception('You must specify an environment: `--staging` or `--production`');
    }

	# Set the branch
	if ( ! isset( $branch ) ) {
		$branch = ( $env == 'production' ) ? 'main' : 'development';
	}

	# If you want a clear format you can use 'Y-m-d_H:i:s'
	$date = ( new DateTime )->format('YmdHis');

	# Load remote environment variables
    $dotenv = Dotenv\Dotenv::create(__DIR__, ".env.{$env}");

	try {
		$dotenv->load();
		$dotenv->required(['SECURITY_KEY', 'PRIMARY_SITE_URL', 'DB_DATABASE', 'DB_USER', 'DEPLOY_SERVER', 'DEPLOY_REPOSITORY', 'DEPLOY_PATH', 'DEPLOY_CRAFT_PATH', 'DEPLOY_KEEP_RELEASES'])->notEmpty();
		$dotenv->required(['DEPLOY_KEEP_RELEASES'])->isInteger();

		# Set remote database variables
		$remote_url = rtrim(preg_replace("(^https?://)", '', getenv('PRIMARY_SITE_URL') ), '/');
		$remote_db_name = getenv('DB_DATABASE');
		$remote_db_user = getenv('DB_USER');
		$remote_db_pass = getenv('DB_PASSWORD');

		# Set deployment variables
		$server = getenv('DEPLOY_SERVER');
		$repo = getenv('DEPLOY_REPOSITORY');
		$app_dir = getenv('DEPLOY_PATH');
		$craft_dir = getenv('DEPLOY_CRAFT_PATH');
		$slack = getenv('DEPLOY_SLACK_WEBHOOK');
		$discord = getenv('DEPLOY_DISCORD_WEBHOOK');
		$healthUrl = getenv('DEPLOY_HEALTH_CHECK');
		$releases_to_keep = getenv('DEPLOY_KEEP_RELEASES');
	} catch ( Exception $e ) {
		throw new Exception("Remote Environment:\n{$e->getMessage()}");
	}

	# Load local environment variables
	$dotenv = Dotenv\Dotenv::create(__DIR__);
	try {
		$dotenv->overload();
		$dotenv->required(['SECURITY_KEY', 'PRIMARY_SITE_URL', 'DB_DATABASE', 'DB_USER', 'UPLOADS_BASE_PATH'])->notEmpty();

		# Set database variables
		$local_url = rtrim(preg_replace("(^https?://)", '', getenv('PRIMARY_SITE_URL') ), '/');
		$local_db_name = getenv('DB_DATABASE');
		$local_db_user = getenv('DB_USER');
		$local_db_pass = getenv('DB_PASSWORD');
        $local_uploads_base_path = trim(getenv('UPLOADS_BASE_PATH'), './');
		$db_dump = "db-dump-{$date}.sql";
	} catch ( Exception $e ) {
		throw new Exception("Local Environment:\n{$e->getMessage()}");
	}

	# Check the deployment path
	if ( substr( $app_dir, 0, 1 ) !== '/' ) throw new Exception('Your deployment path should begin with /');

	# Check the deployment path
	if ( substr( $craft_dir, 0, 1 ) !== '/' ) throw new Exception('Your Craft path should begin with /');

	# Set all our paths
	$app_dir = rtrim($app_dir, '/');
	$craft_dir = trim($craft_dir, '/');
	$public_dir = "{$app_dir}/public";
	$public_html_dir = "{$app_dir}/public_html";
	$current_dir = "{$public_html_dir}/current";
	$shared_dir = "{$public_html_dir}/shared";
	$releases_dir = "{$public_html_dir}/releases";
	$release = "{$releases_dir}/{$date}";
	$release_craft_dir = "{$release}/{$craft_dir}";
	$release_web_dir = "{$release_craft_dir}/web";
	$current_web_dir = "{$current_dir}/web";
	$db_backups_dir = "{$public_html_dir}/db_backups";
	$shared_uploads_dir = "{$shared_dir}/{$local_uploads_base_path}";
	$local_uploads_dir = "web/{$local_uploads_base_path}";
	$project_config_dir = "{$current_dir}/config/project";
	$local_project_config_dir = "config/project";
@endsetup


##################################################
# Servers
##################################################
@servers([ 'remote' => $server, 'local' => 'localhost' ])


##################################################
# Stories
##################################################
@story('init')
    {{-- Setup --}}
	setup
    {{-- Database --}}
	database:local:export
	database:local:upload
	database:local:upload_cleanup
	database:remote:import
    {{-- Deployment --}}
	deployment:start
	deployment:links
	deployment:composer
	deployment:finish
	deployment:cleanup
    {{-- Uploads --}}
    uploads:push
    {{-- Health Check --}}
	healthcheck
@endstory

@story('deploy')
	deployment:start
	deployment:links
	deployment:composer
	deployment:finish
	deployment:cleanup
	healthcheck
@endstory

@story('rollback')
	deployment:rollback
	healthcheck
@endstory

@story('db:pull')
	database:remote:export
	database:remote:download
	{{-- database:remote:download_cleanup --}}
	database:local:import
	healthcheck
@endstory

@story('db:push')
	database:local:export
	database:local:upload
	database:local:upload_cleanup
	database:remote:import
	healthcheck
@endstory

@story('db:backup')
	database:remote:export
	database:remote:download
	healthcheck
@endstory

@story('uploads:sync')
	uploads:push
	uploads:pull
	healthcheck
@endstory


##################################################
# Setup
##################################################
@task('setup', ['on' => 'remote'])
	if [ ! -d {{ $public_html_dir }} ]; then
		cd {{ $app_dir }}

        rm -rf {{ $public_dir }}
		ln -nfs {{ $current_web_dir }} {{ $public_dir }}
		echo "✅ \`public\` directory symlinked"

		mkdir {{ $public_html_dir }}
		echo "✅ \`public_html\` directory created"

		mkdir {{ $shared_dir }}
		echo "✅ Shared directory created"

		mkdir {{ $shared_uploads_dir }}
		echo "✅ Uploads directory created"

		mkdir {{ $db_backups_dir }}
		echo "✅ DB Backups directory created"

		git clone {{ $repo }} --branch={{ $branch }} --depth=1 -q {{ $release }}
		echo "✅ Repository cloned"

		# cp {{ $release }}/.env.{{ $env }} {{ $shared_dir }}/.env
		# ln -nfs {{ $shared_dir }}/.env {{ $release }}/.env
		# echo "✅ Environment file created"

        rm -rf {{ $release }}

		echo "🚀 Deployment setup"
	else
		echo "⚠️️  Deployment already setup"
	fi
@endtask


##################################################
# Reset
##################################################
@task('reset', ['on' => 'remote'])
	cd {{ $app_dir }}

	rm -rf {{ $public_dir }}
	echo "✅ \`public\` directory symlink removed"

	rm -rf {{ $public_html_dir }}
	echo "✅ \`public_html\` directory removed"
@endtask


##################################################
# Deployment
##################################################
@task('deployment:start', ['on' => 'remote'])
	echo "🚀 Deployment started: {{ $date }}"
	git clone {{ $repo }} --branch={{ $branch }} --depth=1 -q {{ $release }}
	echo "✅ Repository cloned"
@endtask

@task('deployment:links', ['on' => 'remote'])
	cp {{ $release_craft_dir }}/.env.{{ $env }} {{ $release_craft_dir }}/.env
	echo "✅ Environment file copied"

    ln -nfs {{ $shared_uploads_dir }} {{ $release_craft_dir }}/{{ $local_uploads_dir }}
	echo "✅ Uploads directory symlinked"
@endtask

@task('deployment:composer', ['on' => 'remote'])
	cd {{ $release_craft_dir }}

	composer install --no-interaction --quiet --no-dev --prefer-dist --optimize-autoloader
	echo "✅ Composer depencencies installed"
@endtask

@task('deployment:finish', ['on' => 'remote'])
	ln -nfs {{ $release_craft_dir }} {{ $current_dir }}
	echo "✅ Current directory symlinked"

	echo "🎉 Deployment successful: {{ $date }}"
@endtask

@task('deployment:cleanup', ['on' => 'remote'])
	cd {{ $release_craft_dir }}

    php craft migrate/all
	echo "✅ Migrations ran"
    php craft clear-caches/all
	echo "✅ Caches cleared"
    php craft project-config/apply
	echo "✅ Project config applied"

	cd {{ $releases_dir }}

	find . -maxdepth 1 -name "20*" | sort | head -n -{{ $releases_to_keep }} | xargs rm -Rf
	echo "✅ Cleaned up old deployments"
@endtask

@task('deployment:rollback', ['on' => 'remote'])
	cd {{ $releases_dir }}

	ROLLBACK_RELEASE=$(find . -maxdepth 1 -name "20*" | sort | tail -n 2 | head -n1 | sed 's/[^0-9]*//g')
	ln -nfs "{{ $releases_dir }}/$ROLLBACK_RELEASE" "{{ $current_dir }}"
	echo "✅ Rolled back to $ROLLBACK_RELEASE"

	find . -maxdepth 1 -name "20*" | sort | tail -n 1 | xargs rm -Rf
	FAILED_ROLLBACK_RELEASE=$(find . -maxdepth 1 -name "20*" | sort | tail -n 1 | sed 's/[^0-9]*//g')
	rm -rf "{{ $releases_dir }}/$FAILED_ROLLBACK_RELEASE"
	echo "✅ Removed failed deployment $FAILED_ROLLBACK_RELEASE"
@endtask


##################################################
# Database
##################################################
@task('database:local:export', ['on' => 'local'])
	mysqldump -u "{{ $local_db_user }}" --password="{{ $local_db_pass }}" "{{ $local_db_name }}" > "{{ $db_dump }}"
	echo "✅ Exported local database"
@endtask

@task('database:local:upload', ['on' => 'local'])
	sed -i '' "s/{{ $local_url }}/{{ $remote_url }}/g" "{{ $db_dump }}"
	echo "✅ Search and replace ran on local database"

	~/go/bin/serfix "{{ $db_dump }}"
	echo "✅ Serfix ran on local database"

	scp "{{ $db_dump }}" "{{ $server }}:{{ $db_backups_dir }}"
	echo "✅ Uploaded local database to remote server"
@endtask

@task('database:local:upload_cleanup', ['on' => 'local'])
	rm "{{ $db_dump }}";
	echo "🧹 Cleaned up uploaded local database"
@endtask

@task('database:local:import', ['on' => 'local', 'confirm' => true])
	sed -i '' "s/{{ $remote_url }}/{{ $local_url }}/g" "{{ $db_dump }}"
	echo "✅ Search and replace ran on remote database"

	~/go/bin/serfix "{{ $db_dump }}"
	echo "✅ Serfix ran on local database"

	mysql -u "{{ $local_db_user }}" --password="{{ $local_db_pass }}" "{{ $local_db_name }}" < "{{ $db_dump }}"
	echo "✅ Imported remote database to local server"
@endtask

@task('database:remote:export', ['on' => 'remote'])
	cd {{ $db_backups_dir }}

	mysqldump -u "{{ $remote_db_user }}" --password="{{ $remote_db_pass }}" "{{ $remote_db_name }}" > "{{ $db_dump }}"
	echo "✅ Exported remote database"
@endtask

@task('database:remote:download', ['on' => 'local'])
	scp "{{ $server }}:{{ $db_backups_dir }}/{{ $db_dump }}" .
	echo "✅ Downloaded remote database"
@endtask

@task('database:remote:download_cleanup', ['on' => 'remote'])
	cd {{ $db_backups_dir }}

	rm "{{ $db_dump }}"
	echo "🧹 Cleaned up downloaded remote database"
@endtask

@task('database:remote:import', ['on' => 'remote', 'confirm' => true])
	cd {{ $db_backups_dir }}
	mysql -u "{{ $remote_db_user }}" --password="{{ $remote_db_pass }}" "{{ $remote_db_name }}" < "{{ $db_dump }}"
	echo "✅ Imported database to remote server"

	rm "{{ $db_dump }}";
@endtask


##################################################
# Uploads
##################################################
@task('uploads:pull', ['on' => 'local'])
    rsync -avzO --exclude ".DS_Store" "{{ $server }}:{{ $shared_uploads_dir }}/" "{{ $local_uploads_dir }}"
	echo "✅ Uploads pulled from remote"
@endtask

@task('uploads:push', ['on' => 'local'])
    rsync -avzO --exclude ".DS_Store" "{{ $local_uploads_dir }}/" "{{ $server }}:{{ $shared_uploads_dir }}"
	echo "✅ Uploads pushed to remote"
@endtask


##################################################
# Project Config
##################################################
@task('config:pull', ['on' => 'local'])
    rsync -avzO --exclude ".DS_Store" "{{ $server }}:{{ $project_config_dir }}/" "{{ $local_project_config_dir }}"
	echo "✅ Project config pulled from remote"

	php craft project-config/apply
	echo "✅ Project config synced"
@endtask

##################################################
# Misc
##################################################
@task('healthcheck', ['on' => 'remote'])
	@if ( ! empty($healthUrl) )
		if [ "$(curl --write-out "%{http_code}\n" --silent --output /dev/null {{ $healthUrl }})" == "200" ]; then
			echo "✅ Health check to {{ $healthUrl }}"
		else
			echo "❌ Health check to {{ $healthUrl }}"
		fi
	@else
		echo "⚠️  No health check URL set"
	@endif
@endtask

{{--
@finished
	# Slack
	@slack($slack, '#deployments', "🚀 Deployment to {$healthUrl}: {$date} complete")

	# Discord
    @discord($discord)
@endfinished
--}}
