# sharesheet

 Multi-user spreadsheet application

## Installation

 Install `Vagrant` by choosing the appropriate installer or package for your platform from the [downloads page](http://downloads.vagrantup.com/). Then install it using standard procedures for your operating system.

 On *nix systems (Mac OSX, Linux, etc), modify your `.bash_profile` (or `.zsh_profile`) to extend your `$PATH` variable:

    PATH=$PATH:/Applications/VirtualBox.app/Contents/MacOS/
    export PATH

 Install `VirtualBox` by choosing the appropriate installer or package for your platform from [downloads page](https://www.virtualbox.org/wiki/Downloads). Then install it using  standard procedures for your operating system.

 Install the Vagrant Salt plugin:

    $ vagrant plugin install vagrant-salt


 Create and configure the guest machine according to the `Vagrantfile`:

    $ vagrant up

 Remote into the `Vagrant` machine:

    $ vagrant ssh

## Run application

 Remote into the `Vagrant` machine:

    $ vagrant ssh

 Start application:

    $ cd /vagrant

 Of course have `component(1)` installed:

    $ npm install -g component

 Install express for the server, and the component dependencies:

    $ npm install
    $ make

## Running the app

 Start application on PORT 3000

    $ node app

 Start application on custom PORT

    $ PORT=4000 node app

## Features

 - [ ] multiple sheets
 - [ ] realtime synced views
 - [ ] CSV import
 - [ ] CSV export
 - [ ] row and column resizing
 - [ ] cell formatting
    - [ ] color
    - [ ] backgound color
    - [ ] border
    - [ ] justification

