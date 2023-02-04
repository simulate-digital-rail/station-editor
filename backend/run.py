# dirty fix for yaramo bug
import yaramo.model
from yaramo.signal import SignalKind
yaramo.model.SignalKind = SignalKind

import argparse  # noqa: E402
import os  # noqa: E402
from subprocess import Popen  # noqa: E402
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


def run_frontend() -> Popen:
    working_directory = os.getcwd()
    frontend_working_directory = os.path.join(working_directory, "frontend")
    return Popen(
        ["npm", "start"],
        cwd=frontend_working_directory
    )


def main():
    app.config['TOPOLOGY_WRAPPER'] = TopologyWrapper(*parse_importer())
    frontend_process = run_frontend()
    try:
        app.run(port=5000)
    finally:
        frontend_process.terminate()


if __name__ == "__main__":
    main()
