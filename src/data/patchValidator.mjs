class Validator {
    constructor() {
        this.assertNonArrayObj = this.assertNonArrayObj.bind(this);

        this.getOnlyKey = this.getOnlyKey.bind(this);
        this.getOnlyValue = this.getOnlyValue.bind(this);

        this._getPostObj = this._getPostObj.bind(this);
        this.isValidPatchBody = this.isValidPatchBody.bind(this);

        this.getUpdateObj = this.getUpdateObj.bind(this);
        this.getWhereObj = this.getWhereObj.bind(this);

        this.getUpdateKey = this.getUpdateKey.bind(this);
        this.getUpdateValue = this.getUpdateValue.bind(this);

        this.getWhereKey = this.getWhereKey.bind(this);
        this.getWhereValue = this.getWhereValue.bind(this);
    }

    WHERE = "where"
    UPDATE = "<UPDATE_KEY>"

    assertArray(array) {
        if (!array || typeof(array) !== "object" || !Array.isArray(array)) {
            console.log(`Not an array: `, array);
            throw new Error(`Expected array. Got ${typeof(array)}, ${array}`);
        }
    }

    assertNonArrayObj(obj) {
        if (!obj || typeof(obj) !== "object" || Array.isArray(obj)) {
            console.log(`Not a non-array object: `, obj);
            throw new Error(`Expected non-array object data type. Got ${typeof(obj)}, ${obj}`);
        }
    }

    getOnlyKey(obj) {
        this.assertNonArrayObj(obj);
        const keys = Object.keys(obj);
        if (keys.length !== 1) {
            console.log("obj: ", obj)
            throw new Error(`Expected obj with 1 key. Got: ${keys.length}`)
        };
        return keys[0];
    }
    
    getOnlyValue(obj) {
        this.assertNonArrayObj(obj);
        const values = Object.values(obj);
        if (values.length !== 1) {
            console.log("obj: ", obj)
            throw new Error(`Expected obj with 1 value. Got: ${values.length}`)
        };
        return values[0];
    } 

    _getPostObj(body, which) {

        this.assertNonArrayObj(body);
        const keys = Object.keys(body);
        const { WHERE, UPDATE } = this;

        if (keys.length !== 2) {
            console.log("body: ", body);
            throw new Error(`Expected body obj with 2 keys. Got ${keys.length}.`)
        };
    
        if (!keys.includes(WHERE)) {
            console.log("body: ", body);
            throw new Error(`Missing required key '${WHERE}' in body.`)
        }

        const whereKeyIndex = keys.indexOf(WHERE);
        const updateKeyIndex = 1 - whereKeyIndex; // 0 or 1 (if length == 2 (asserted above))
        const updateKey = keys[updateKeyIndex];
        if (updateKey === WHERE) {
            console.log("body: ", body);
            throw new Error(`Two '${WHERE}' keys found. No updateKey found.`)
        }
    
        const whereObj = body[WHERE];
        const updateObj = body[updateKey]
        

        

        switch(which) {
            case WHERE:
                return whereObj;
            case UPDATE:
                return updateObj;
            default:
                throw new Error(`No case for '${which}'`);
        }
    }

    isValidPatchBody(body) {
        const whereObj = this._getPostObj(body, this.WHERE);
        return (whereObj != null && whereObj !== undefined);
    }
    
    getUpdateObj(body) { return this._getPostObj(body, this.UPDATE) }
    getWhereObj(body) { return this._getPostObj(body, this.WHERE) }
    
    getUpdateKey(body) { return this.getOnlyKey(this.getUpdateObj(body))}
    getUpdateValue(body) { return this.getOnlyValue(this.getUpdateObj(body))}
    
    getWhereKey(body) { return this.getOnlyKey(this.getWhereObj(body))}
    getWhereValue(body) { return this.getOnlyValue(this.getWhereObj(body))}


}

const validator = new Validator();
export default validator;