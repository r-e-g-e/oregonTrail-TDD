export class Wagon{
  constructor(capacity){
    this.capacity = capacity
    this.passangers = new Array()
  }

  getAvailableSeatCount(){
    const result = this.capacity - this.passangers.length

    return result <= 0 ? 0 : result
  }

  join(traveller){
    if(!(traveller instanceof Traveller)) return false
    if(!this.getAvailableSeatCount()) return false

    this.passangers.push(traveller)
    
    return true
  }

  shouldQuarentine(){
    for(const traveller of this.passangers){
      if(!traveller.isHealthy) return true
    }

    return false  
  }

}

export class Traveller{
  constructor(name){
    this.name = name
    this.food = 1
    this.isHealthy = true
  }

  hunt(){
    this.food += 2
  }

  eat(){
    if(this.food >= 1){
      this.food--
    }else{
      this.isHealthy = false
    }
  }
}