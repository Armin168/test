DIRNAME:= $(notdir $(CURDIR))

.PHONY: image

image:
	docker build -t $(DIRNAME):local .

run:
	docker run -i -t --rm -p 3000:3000 $(DIRNAME):local

rmi:
	docker rmi $(DIRNAME):local

clean:
	rm -rf coverage
	rm -rf node_modules
	rm -rf dist
	rm -f junit.xml
	rm -f package-lock.json
	
up:
	docker-compose up -d

down:
	docker-compose down
