/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      title
      startTime
      endTime
      repeat
      allDay
      daysOfWeek
      group
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      title
      startTime
      endTime
      repeat
      allDay
      daysOfWeek
      group
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      title
      startTime
      endTime
      repeat
      allDay
      daysOfWeek
      group
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCalendarGroup = /* GraphQL */ `
  mutation CreateCalendarGroup(
    $input: CreateCalendarGroupInput!
    $condition: ModelCalendarGroupConditionInput
  ) {
    createCalendarGroup(input: $input, condition: $condition) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCalendarGroup = /* GraphQL */ `
  mutation UpdateCalendarGroup(
    $input: UpdateCalendarGroupInput!
    $condition: ModelCalendarGroupConditionInput
  ) {
    updateCalendarGroup(input: $input, condition: $condition) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCalendarGroup = /* GraphQL */ `
  mutation DeleteCalendarGroup(
    $input: DeleteCalendarGroupInput!
    $condition: ModelCalendarGroupConditionInput
  ) {
    deleteCalendarGroup(input: $input, condition: $condition) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
