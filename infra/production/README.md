# Выкладка на recessed-maxilla.space

Caddy работает как служба systemd на Ubuntu и принимает запросы на портах 80 и 443. [Caddyfile](Caddyfile) задаёт домен, сжатие и проксирование в Next.js. [Docker Compose](compose.yaml) публикует порт приложения на `127.0.0.1:3000` и поднимает контейнер после перезапуска Docker. Контейнер использует образ для Linux amd64.

## DNS и HTTPS

В зоне `recessed-maxilla.space` у корня (`@`) должна быть одна запись A с публичным IPv4 сервера. Для текущего сервера с одним IPv4 удалите старую запись AAAA у корня. Когда DNS указывает на сервер и входящие TCP 80 и 443 доступны, Caddy автоматически запрашивает и продлевает публичный сертификат, а запросы по HTTP перенаправляет на HTTPS. Состояние выпуска видно в `journalctl -u caddy`. [Документация Caddy](https://caddyserver.com/docs/automatic-https)

## Доступ

Для входа под отдельным пользователем `dev` выполните на рабочей машине:

```sh
ssh -o IdentitiesOnly=yes -i ~/.ssh/team-onboarding-dev dev@recessed-maxilla.space
```

До обновления DNS укажите IP из локального файла `docs/server-access.local.md`. Там же хранится пассфраза для расшифровки закрытого ключа на рабочей машине. Права на файл и закрытый ключ — `0600`. Серверу достаточно открытого ключа в `/home/dev/.ssh/authorized_keys`. [Правило sshd](60-team-onboarding-dev.conf) требует аутентификацию по ключу для пользователя `dev`. У этой учётной записи обычные пользовательские права. Выкладку выполняет администратор.

## Установка на новом сервере

На Ubuntu 26.04 установите пакеты `docker.io`, `docker-compose-v2` и `caddy`. Команды ниже выполняются администратором из копии репозитория на сервере.

```sh
install -d -m 755 /srv/team-onboarding
install -m 644 infra/production/compose.yaml /srv/team-onboarding/compose.yaml
install -m 644 infra/production/Caddyfile /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl enable --now docker caddy
systemctl reload caddy
```

Для первой настройки SSH создайте пользователя и установите предоставленный открытый ключ. Укажите путь к переданной публичной части ключа в переменной `DEV_PUBLIC_KEY`.

```sh
useradd --create-home --shell /bin/bash dev
install -d -o dev -g dev -m 700 /home/dev/.ssh
install -o dev -g dev -m 600 "${DEV_PUBLIC_KEY:?}" /home/dev/.ssh/authorized_keys
install -m 644 infra/production/60-team-onboarding-dev.conf /etc/ssh/sshd_config.d/
sshd -t && systemctl reload ssh
```

## Выкладка версии

Из корня репозитория запустите в Bash следующие команды. Задайте `DEPLOY_HOST` в виде `root@имя-сервера`. Тег образа соответствует дереву `frontend/` в выбранном коммите. Сборка использует только файлы из Git.

```bash
set -e -o pipefail
tag=$(git rev-parse --short=12 HEAD:frontend)
git archive --format=tar HEAD:frontend |
  docker buildx build --platform linux/amd64 --load -t "team-onboarding:$tag" -
docker save "team-onboarding:$tag" | gzip -1 | ssh "${DEPLOY_HOST:?}" 'docker load'
ssh "$DEPLOY_HOST" "cd /srv/team-onboarding &&
  echo FRONTEND_TAG=$tag > .env.next &&
  docker compose --env-file .env.next up -d --pull never &&
  mv .env.next .env"
```

При первой выкладке хранилище локального Docker было заполнено. Образ собрали непосредственно на сервере с временным swap-файлом 2 ГБ. Для такого запуска вместо локальной сборки и передачи образа выполните:

```bash
git archive --format=tar HEAD:frontend |
  ssh "${DEPLOY_HOST:?}" "docker build -t team-onboarding:$tag -"
```

Затем запустите сервис командой Compose выше. После завершения сборки временный swap можно отключить.

Для возврата к ранее загруженной версии подставьте её тег в команду с `docker compose --env-file .env.next up`. После выкладки проверьте редирект, доверие к сертификату и обе локали с внешней машины:

```sh
curl -sSI http://recessed-maxilla.space/ru
curl -fsSL -o /dev/null -w '%{http_code} %{url_effective}\n' https://recessed-maxilla.space/
curl -fsS -o /dev/null -w '%{http_code}\n' https://recessed-maxilla.space/en
```

Ожидаемые результаты — HTTP 308 на HTTPS, главная страница с конечным адресом `/ru` и ответ 200 для обеих локалей.
