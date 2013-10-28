
include:
  - node

npm-install:
  cmd.run:
    - name: npm install
    - cwd: /vagrant/
    - require:
      - cmd.run: nodejs-install
