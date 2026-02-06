ZENSICAL := zensical
DEPS = zensical
RUN = uv run --with=$(DEPS)

.PHONY: serve build clean

serve: build
	@$(RUN) $(ZENSICAL) serve

build: clean
	@$(RUN) $(ZENSICAL) build --clean

clean:
	@rm -rf site

install-deps-ci:
	pip install zensical
