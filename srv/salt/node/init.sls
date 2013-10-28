nodejs-deps:
  pkg.installed:
    - names:
      - libssl-dev
      - git
      - pkg-config
      - build-essential
      - curl
      - gcc
      - g++
      - checkinstall

nodejs-source:
  git.latest:
    - target: /usr/src/node-v{{ pillar['node']['version'] }}
    - name: git://github.com/joyent/node.git
    - rev: v{{ pillar['node']['version'] }}
    - require:
      - pkg: nodejs-deps

nodejs-install:
  cmd.run:
    - cwd: /usr/src/node-v{{ pillar['node']['version'] }}
    - names: 
      - ./configure
      - make
      - make install
    - require: 
      - git: nodejs-source
      - pkg: nodejs-deps
