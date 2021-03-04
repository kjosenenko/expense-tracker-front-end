class TransactionType {

    all = []

    constructor(id, category) {
        this.id = id;
        this.category = category;
        this.all.push(this);
    }
}