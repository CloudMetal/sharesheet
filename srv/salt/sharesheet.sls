include:
  - node
  - leveldb

npm-install:
  cmd.wait:
    - cwd: /vagrant/
    - names: 
      - npm install -g component
      - npm install
    - watch:
      - cmd: nodejs-install

leveldb-dir:
  file.directory:
    - name: /data/sharesheet-db
    - mode: 777
    - makedirs: True
