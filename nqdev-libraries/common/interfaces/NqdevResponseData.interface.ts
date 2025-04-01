import type { IDataObject } from 'n8n-workflow';

export interface INqdevResponseData extends IDataObject {
  executionId: string;
  resource: string;
  operation: string;
  status: 'backlog' | 'completed';
  timestamp: string;
}
