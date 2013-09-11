
MANIFESTS = $(wildcard client/*/component.json)
SRC = $(wildcard client/*/*.js)
HTML = $(wildcard client/*/*.html)
TEMPLATES = $(HTML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@component build --dev

components: $(MANIFESTS)
	@component install --dev

%.js: %.html
	@component convert $<

clean:
	rm -fr build components $(TEMPLATES)

bootstrap:
	node ./script/bootstrap.js

.PHONY: clean
