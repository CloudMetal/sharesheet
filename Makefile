
SRC = $(wildcard client/*/*.js)
HTML = $(wildcard client/*/*.html)
TEMPLATES = $(THML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@component build --dev

components: component.json
	@component install --dev

%.js: %.html
	@component convert $<

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean
