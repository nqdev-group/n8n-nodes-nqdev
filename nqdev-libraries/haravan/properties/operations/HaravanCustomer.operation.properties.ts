import type { INodeProperties } from "n8n-workflow";

export const haravanCustomerOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {},
    options: [],
    default: '',
  }
]
