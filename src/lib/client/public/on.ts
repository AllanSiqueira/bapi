function on(listener: string, next: Function) {
    this.listeners.push({
        type: listener,
        action: next
    });
}
export {on}