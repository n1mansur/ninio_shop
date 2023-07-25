CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})
APP_CMD_DIR=${CURRENT_DIR}/cmd
REGISTRY=anmimos
PROJECT_NAME=fino

TAG=$(shell git rev-parse --short HEAD)
ENV_TAG=latest

pull-proto-module:
	git submodule update --init --recursive

update-proto-module:
	git submodule update --remote --merge

copy-proto-module:
	rm -rf ${CURRENT_DIR}/protos
	rsync -rv --exclude={'/.git','LICENSE','README.md'} ${CURRENT_DIR}/fo_protos/* ${CURRENT_DIR}/protos

build:
	CGO_ENABLED=0 GOOS=linux go build -mod=vendor -a -installsuffix cgo -o ${CURRENT_DIR}/bin/${APP} ${APP_CMD_DIR}/main.go
 
network:
	docker network create --driver=bridge ${NETWORK_NAME}

build-image:
#	docker system prune -f
	echo "FO_FRONTEND_VERSION=${TAG}" >> ../.env
	docker build --rm -t ${REGISTRY}/${APP}:${TAG} .
	docker service update --image=${REGISTRY}/${APP}:${TAG} ${PROJECT_NAME}_${APP}

push-image:
	docker push ${REGISTRY}/${APP}:${TAG}

swag-init:
	swag init -g api/api.go -o api/docs

run:
	go run cmd/main.go


