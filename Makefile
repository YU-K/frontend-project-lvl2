install: install-deps

start:
	# npx babel-node 'src/bin/gendiff.js' /home/user/before_r.json /home/user/after_r.json
	# npx babel-node 'src/bin/gendiff.js' /home/user/after_r.ini /home/user/before_r.ini
	npx babel-node 'src/bin/gendiff.js' /home/user/after.ini /home/user/before.ini

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
