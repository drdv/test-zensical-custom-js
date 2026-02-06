ZENSICAL := zensical
DEPS = zensical==0.0.13
RUN = uv run --with=$(DEPS)

.PHONY: serve build clean

serve: build
	@$(RUN) $(ZENSICAL) serve

build: clean
	@$(RUN) $(ZENSICAL) build --clean

clean:
	@rm -rf site
