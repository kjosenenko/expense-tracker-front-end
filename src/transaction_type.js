class TransactionType {

    static all = []

    constructor(id, category) {
        this.id = id;
        this.category = category;
        TransactionType.all.push(this);
    }

    static returnType(transaction_type_id) {
        const type = TransactionType.all.filter(t => {
            return t.id == transaction_type_id;
        })
        return type[0].category;
    }
}