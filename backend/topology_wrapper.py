from typing import Callable, Dict

from cli_importer.cli import CLI
from orm_importer.importer import ORMImporter
from planpro_importer.reader import PlanProReader
from yaramo.model import Topology


class TopologyWrapper:

    @staticmethod
    def _import_planpro(filename: str) -> Topology:
        reader = PlanProReader(filename)
        return reader.read_topology_from_plan_pro_file()

    @staticmethod
    def _import_orm(_) -> Topology:
        return ORMImporter().run("")

    @staticmethod
    def _import_cli(_) -> Topology:
        cli = CLI()
        cli.run()
        return cli.topology

    IMPORTERS: Dict[str, Callable[[str], Topology]] = {
        'planpro': _import_planpro,
        'orm': _import_orm,
        'cli': _import_cli
    }

    topology: Topology

    def __init__(self, importer: str, filename: str | None = None):
        self.topology = self.IMPORTERS[importer](filename)

    def _nodes_to_dict(self) -> Dict:
        return {
            uuid: {
                'x': node.geo_node.geo_point.x,
                'y': node.geo_node.geo_point.y
            }
            for uuid, node in self.topology.nodes.items()
        }

    def _edges_to_dict(self) -> Dict:
        return {
            uuid: {
                'nodeA': edge.node_a.uuid,
                'nodeB': edge.node_b.uuid,
                'geoNodes': {
                    geo_node.uuid: {
                        'x': geo_node.geo_point.x,
                        'y': geo_node.geo_point.y
                    }
                    for geo_node in edge.intermediate_geo_nodes
                }
            }
            for uuid, edge in self.topology.edges.items()
        }

    def to_dict(self) -> Dict:
        return {
            'nodes': self._nodes_to_dict(),
            'edges': self._edges_to_dict()
        }
