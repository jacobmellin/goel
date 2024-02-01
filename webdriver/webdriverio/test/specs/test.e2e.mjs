describe('Goel main window', () => {
    it('should have the root element', async () => {
        const element = await $('#root');
        expect(element).toExist();
    });
});
