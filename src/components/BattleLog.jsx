const BattleLog = ({ battleLog }) => {
  return (
    <>
      <h2>Battle Log</h2>
      <ul>
        {battleLog.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </>
  );
}
export default BattleLog;