# dirty fix for yaramo bug
import yaramo.model
from yaramo.signal import SignalKind
yaramo.model.SignalKind = SignalKind

import argparse  # noqa: E402
from typing import Tuple  # noqa: E402

from server import app  # noqa: E402
from topology_wrapper import TopologyWrapper  # noqa: E402


def parse_importer() -> Tuple[str, str]:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--importer',
        default='cli',
        type=str,
        choices=TopologyWrapper.IMPORTERS.keys()
    )
    parser.add_argument('-f', '--filename', default="", type=str)
    args = parser.parse_args()
    return args.importer, args.filename


def main():
    app.config['TOPOLOGY_WRAPPER'] = TopologyWrapper(*parse_importer())
    app.run(port=5000)


if __name__ == "__main__":
    main()
