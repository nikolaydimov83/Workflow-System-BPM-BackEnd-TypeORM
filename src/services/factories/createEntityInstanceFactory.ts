export function createEntityInstance(Entity,object){

    return Object.assign(new Entity(), object)
}

