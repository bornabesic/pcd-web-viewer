
port = 1337

all: serve

three.js:
	git clone --depth 1 --single-branch --branch master https://github.com/mrdoob/three.js

serve: three.js
	python3 -m http.server $(port)