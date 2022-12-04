{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    node2nix
    nodejs
    nodePackages.nodemon
    nodePackages.npm
    gnumake
  ];
}
