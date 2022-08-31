export const PROJECT_TITLE = 'Task Management'
export const HOME_PAGE_TITLE = 'Home'
export const EDIT_PAGE_TITLE = 'Edit'

export const STATUSES = {
  TODO: {
    name: 'TODO',
    label: 'ToDo',
    nextPosableStatuses: ['IN_PROGRESS']
  },
  BLOCKED: {
    name: 'BLOCKED',
    label: 'Blocked',
    nextPosableStatuses: ['TODO']
  },
  IN_PROGRESS: {
    name: 'IN_PROGRESS',
    label: 'InProgress',
    nextPosableStatuses: ['BLOCKED', 'IN_QA']
  },
  IN_QA: {
    name: 'IN_QA',
    label: 'InQA',
    nextPosableStatuses: ['TODO', 'DONE']
  },
  DONE: {
    name: 'DONE',
    label: 'Done',
    nextPosableStatuses: ['DEPLOYED']
  },
  DEPLOYED: {
    name: 'DEPLOYED',
    label: 'Deployed',
    nextPosableStatuses: []
  }
}
