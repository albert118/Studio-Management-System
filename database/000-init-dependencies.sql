-- add extra databases here

-- the main database (StudioManagementSystem) is created with the maria-db container
create database if not exists NginxProxyManager;

-- add the admin (with root access) user

create user if not exists 'admin_user'@'%' identified by 'super_secret_password';
grant ALL PRIVILEGES on *.* TO 'admin_user'@'%' IDENTIFIED BY 'super_secret_password';

-- add the API user

create user if not exists 'sms_user'@'%' identified by 'super_secret_password';
grant ALL PRIVILEGES on StudioManagementSystem.* TO 'sms_user'@'%' IDENTIFIED BY 'super_secret_password';

-- add the NPM (proxy) user

create user if not exists 'npm_user'@'%' identified by 'super_secret_password';
grant ALL PRIVILEGES on NginxProxyManager.* TO 'npm_user'@'%' IDENTIFIED BY 'super_secret_password';
