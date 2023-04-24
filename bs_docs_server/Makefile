
BASE_DIR = $(CURDIR)
OUTPUT_DIR = $(BASE_DIR)/bs_docs_server/dist/

.PHONY: default
default: all

.PHONY: all
all: build start

.PHONY: test
test:
	npm test

.PHONY: build
build:
	docker build --no-cache . -t boardsource/docs-server&&docker push boardsource/docs-server


.PHONY: clean
clean:
	[ ! -d "$(OUTPUT_DIR)" ] || rm -rf "$(OUTPUT_DIR)"

.PHONY: start
serve:
	npm start

.PHONY: install
install:
	npm install
