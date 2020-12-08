import readlineSync from 'readline-sync';

export class View {

    public static printMainMenu(): void {
        console.log("Main menu. Choose your options: ");
        console.log("1.Read list of entities");
        console.log("2.Read entity by ID");
        console.log("3.Create entity");
        console.log("4.Update entity");
        console.log("5.Delete entity");
        console.log("6.Work with many to many connection");
        console.log("7.search1");
        console.log("8.search2");
        console.log("9.search3");
        console.log("10.Generate random data");
        console.log("0.Exit");
    }

    public static printOptionsMenu(): void {
        console.log("Choose an entity:");
        console.log("1.Animal");
        console.log("2.Hospital");
        console.log("3.Doctor");
    }

    public static printManyToManyMenu(): void {
        console.log("Choose an entity:");
        console.log("1.See all connection");
        console.log("2.See all connections for doctor");
        console.log("3.See all connections for animal");
        console.log("4.Create connection");
        console.log("5.Delete connection");
        console.log("6.Generate random data");
    }

    public static readInteger(text: string): number {        
        return parseInt(readlineSync.question(text));
    }


    public static readFloat(text: string): number {
        return parseFloat(readlineSync.question(text));
    }

    public static readString(text: string): string {
        return readlineSync.question(text);
    }

    public static readDate(text: string): Date {
        return new Date(readlineSync.question(text));
    }

    public static readBoolean(text: string): boolean {
        return readlineSync.question(text) === "true" ? true : false;
    }

    public static printEntities(entities: any): void {
        console.table(entities);
    }

    public static printLine(text: string): void {
        console.log(text);
    }

    public static pressToReturn(): void {
        readlineSync.question("Press any key to return: ");
        return;
    }

    public static printMapEntities(entities: Map<any, any>): void {
        entities.forEach((value, key) => {
            console.log(key);
            console.log(value);
        })
    }

}