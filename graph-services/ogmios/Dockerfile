FROM nixos/nix:latest

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf \
    && echo "accept-flake-config = true" >> /etc/nix/nix.conf \
    && echo "substituters = https://cache.nixos.org https://cache.iog.io" >> /etc/nix/nix.conf \
    && echo "trusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY= hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ=" >> /etc/nix/nix.conf

RUN nix build -Lv 'git+https://github.com/IntersectMBO/ogmios.git?submodules=1' \
    --out-link /app/ogmios-result

EXPOSE 1337

ENTRYPOINT ["/app/ogmios-result/bin/ogmios"]
CMD ["--help"]
