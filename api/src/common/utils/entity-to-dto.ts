export interface BaseEntity {
  id: string;
  name: string;
}

function extractFromEntity(o: { [key: string]: any }): BaseEntity {
  return {
    id: o.id as string,
    name: o.name as string,
  };
}

export function entityToDto(
  entity: { [key: string]: any },
  dto: { [key: string]: any },
): { [key: string]: any } {
  for (const key in dto) {
    if (key in entity) {
      if (entity[key] instanceof Date) {
        dto[key] = entity[key];
      } else if (typeof entity[key] === 'object') {
        dto[key] = extractFromEntity(entity[key]);
      } else {
        dto[key] = entity[key];
      }
    }
  }

  return dto;
}
