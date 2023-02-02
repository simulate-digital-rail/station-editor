# station-editor

## Endpoints

### GET /topology

Returns the topology of network as a YARAMO model

```
{
    nodes : [
        101: {
            x,
            y,
        },
        ...
    ],
    edges: [
        102: {
            nodeA: 101,
            nodeB: 103 ,
            geoNodes: [
                {
                    x,
                    y,
                },
                ...
            ]
        },
        ...
    ]
}
```

### GET /stopAreas

Returns the list of stop areas
#### Body
```
    {
        nodeA: 101,
        nodeB: 102
    }

```
#### Response

```
[
    {
        length: 820,
        switchCount: 2,
        nodes: [
            102,
            103,
            105
        ]    
    },
    ...
]

```
