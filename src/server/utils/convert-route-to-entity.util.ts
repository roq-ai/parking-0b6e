const mapping: Record<string, string> = {
  organizations: 'organization',
  'parking-spaces': 'parking_space',
  reports: 'report',
  tickets: 'ticket',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
