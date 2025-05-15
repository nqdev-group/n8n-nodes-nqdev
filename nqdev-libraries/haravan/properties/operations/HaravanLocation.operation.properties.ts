import type { INodeProperties } from "n8n-workflow";

export const haravanLocationOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'location'
        ]
      }
    },
    options: [
      {
        name: 'Get All Locations',
        value: 'getAllLocations',
        description: 'Retrieve a list of locations',
        action: 'Get all locations',
      },
      {
        name: 'Get Location',
        value: 'getLocation',
        description: 'Retrieve a single location',
        action: 'Get a location by ID',
      },
    ],
    default: 'getAllLocations',
  }
];
