import IPrato from '../../../interfaces/IPrato';
import styles from './Prato.module.scss';

interface PratoProps {
  prato: IPrato
}

const Prato = ({ prato }: PratoProps) => {
  return (<div className={styles.Prato}>
    <div className={styles.Container}>
      <div>
        <div className={styles.EfeitoTorcao}>
          <img src={prato.imagem} alt={prato.descricao}/>
        </div>
      </div>
    </div>
    <div className={styles.Conteudo}>
      <h3>{prato.nome}</h3>
      <div className={styles.Tag}>
        {prato.tag}
      </div>
      <div>
        {prato.descricao}
      </div>
    </div>
  </div>)
}

export default Prato