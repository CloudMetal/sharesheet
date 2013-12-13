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

nodejs-install:
  git.latest:
    - target: /usr/src/node-v{{ pillar['node']['version'] }}
    - name: git://github.com/joyent/node.git
    - rev: v{{ pillar['node']['version'] }}
    - require:
      - pkg: nodejs-deps
  cmd.wait:
    - cwd: /usr/src/node-v{{ pillar['node']['version'] }}
    - names: 
      - ./configure
      - make
      - make install
    - watch: 
      - git: nodejs-install
