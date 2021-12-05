/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const Lorem: FC = () => {
  return (
    <section
    // css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}
    >
      <div
        css={css`
          /* background-color: ${theme`colors.electric`}; */
        `}
      >
        Lorem Ipsum
      </div>
      <div id="lipsum">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis
          nisl sed mattis varius. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Nullam ultricies
          lacus tempus sapien dapibus iaculis. Aenean in ipsum eu ligula
          faucibus posuere. Vestibulum malesuada tellus nunc, at suscipit velit
          iaculis semper. Maecenas eu molestie sem. Mauris ut finibus nisi. Cras
          posuere suscipit velit iaculis dictum. Etiam augue nisi, dictum id
          purus ac, vulputate ullamcorper sem. Etiam non sollicitudin libero,
          non tristique sem.
        </p>
        <p>
          Aenean est risus, tristique ut aliquam in, elementum faucibus felis.
          Nulla vitae urna lorem. Curabitur cursus dui eget ipsum fringilla
          fringilla id nec libero. Cras eros urna, ullamcorper in eros sed,
          mattis sodales justo. Ut lacinia urna vel sollicitudin sollicitudin.
          Praesent sodales felis arcu, ac blandit tortor eleifend et. Vestibulum
          neque eros, ultrices a commodo elementum, scelerisque et tellus.
          Vivamus vitae lorem et diam feugiat finibus. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Donec luctus sapien
          pellentesque dapibus vestibulum.
        </p>
        <p>
          Donec convallis magna venenatis justo euismod laoreet. Vestibulum
          pretium ligula ut dui molestie, in mattis sem varius. Mauris ac quam
          vel arcu dignissim pulvinar. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Donec massa sapien, tempus tempus augue in,
          aliquet posuere felis. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Aliquam ante dolor,
          tincidunt nec tincidunt eu, lacinia a augue. Cras vitae diam placerat
          sapien sagittis pulvinar ut vitae ipsum. Fusce condimentum laoreet
          dapibus.
        </p>
        <p>
          Nulla est lectus, molestie sed finibus vitae, porta nec augue. Duis in
          congue nisl, eget ultrices tortor. Morbi varius, ante ac lacinia
          interdum, mauris arcu posuere tortor, at ultrices magna ex a nisi.
          Vivamus mauris mauris, interdum vitae convallis vitae, ullamcorper at
          eros. Donec sodales sodales justo, eu dictum tellus rutrum ac. Mauris
          aliquam efficitur feugiat. Mauris convallis risus dolor, sit amet
          egestas nunc suscipit vel.
        </p>
        <p>
          Aenean tincidunt ex vitae elementum vehicula. Pellentesque elementum
          rutrum est, a volutpat velit faucibus quis. Sed faucibus venenatis
          placerat. Phasellus et fermentum ex. Aenean tempus posuere sapien, sed
          congue risus viverra vitae. Integer feugiat, felis non vestibulum
          tempus, ipsum nunc congue ex, sit amet elementum tellus mi in lacus.
          Etiam lacinia felis et metus viverra, non facilisis nulla auctor.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc
          sollicitudin blandit tortor, quis molestie ipsum. Nullam ullamcorper
          risus venenatis feugiat fermentum. Pellentesque arcu dui, tristique
          quis tortor eget, euismod sagittis nunc.
        </p>
        <p>
          Curabitur turpis nunc, gravida quis aliquam et, ullamcorper ac elit.
          Praesent quam nisi, faucibus eu porta et, semper eget neque. Vivamus
          eu tincidunt lectus. Donec nec dui a urna fringilla egestas. Mauris ut
          nisi risus. Maecenas sed elit diam. In vitae viverra sapien, maximus
          molestie mi. Suspendisse sagittis maximus enim, a feugiat nisi sodales
          vitae. Pellentesque imperdiet ipsum eu metus semper venenatis. Aliquam
          erat volutpat. Nunc ut blandit felis. Mauris aliquam, augue at
          elementum tincidunt, eros erat maximus diam, at pharetra eros orci sed
          velit.
        </p>
        <p>
          Nam eros est, elementum sit amet dapibus at, tincidunt non lacus.
          Morbi et fringilla tortor. Phasellus quis enim convallis, lacinia
          metus vel, ultrices urna. Curabitur scelerisque justo volutpat luctus
          congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque laoreet metus et dui porta dapibus. Morbi accumsan leo at arcu
          sodales condimentum. Aliquam fermentum odio vel lorem feugiat
          elementum. Curabitur bibendum, massa in venenatis porta, urna neque
          pulvinar dui, nec volutpat ex justo ac arcu.
        </p>
        <p>
          Sed sodales venenatis velit ac ullamcorper. Aenean sit amet auctor ex.
          Integer sit amet egestas leo. Vestibulum justo purus, lobortis et
          maximus non, rhoncus quis diam. Nullam mattis aliquet sem feugiat
          iaculis. Donec non tempus tellus, quis accumsan ipsum. Sed accumsan
          faucibus ipsum eu tincidunt. Aliquam pulvinar tempus eros, at egestas
          justo tristique eu. Vivamus velit arcu, dictum id lorem non, cursus
          vestibulum arcu. Morbi non scelerisque ligula.
        </p>
        <p>
          Cras ullamcorper tincidunt lorem, sit amet euismod erat consequat nec.
          Quisque dictum, orci eu bibendum varius, nulla risus dictum nibh, ut
          auctor nibh ex id urna. Phasellus consequat tellus nec diam tincidunt,
          sit amet sodales tellus laoreet. Pellentesque et nisi nec turpis
          mattis fermentum et a metus. Morbi non ligula eu arcu interdum aliquet
          ut in elit. Pellentesque id enim tempor, sagittis magna a, scelerisque
          magna. Vivamus fermentum consequat diam quis malesuada. Morbi
          porttitor purus dolor, egestas vehicula mi efficitur at. Aenean nec
          enim egestas, pellentesque purus et, faucibus ante. Morbi eget odio at
          purus finibus mattis. Aliquam egestas laoreet metus in dapibus. Nam
          pharetra malesuada ultricies. Nunc non leo suscipit, vehicula turpis
          vel, blandit est. Nulla at neque mollis magna egestas posuere ut ut
          tortor. Etiam consequat lectus nisl, a feugiat leo blandit egestas.
          Praesent aliquam est nec quam posuere, eget aliquet nisi sagittis.
        </p>
        <p>
          Duis eget gravida nunc, quis laoreet justo. Phasellus maximus justo
          purus, vel vulputate est porttitor at. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Cras ac
          tristique libero. Nam in orci aliquam justo sagittis lobortis quis at
          est. Proin quis convallis dolor, quis consequat dui. Nulla non lacinia
          turpis. Praesent efficitur nisi erat, eget tincidunt felis tincidunt
          eget. Suspendisse consequat nulla a sem porttitor ultricies. Cras
          consequat feugiat arcu a elementum.
        </p>
        <p>
          Donec interdum, erat at fringilla aliquet, orci dui lobortis odio,
          eget lobortis ante metus in velit. Proin a urna luctus, vehicula
          tellus in, tristique eros. Quisque sit amet sapien a ligula tempus
          aliquet. Aliquam tempus purus augue, sit amet hendrerit ante gravida
          a. Nam tincidunt ac felis eget suscipit. Donec et varius enim. Proin
          molestie justo in augue molestie malesuada. Quisque mattis, metus a
          aliquam dictum, nunc enim dictum nisi, eget dignissim elit quam in
          orci. Donec condimentum blandit urna vitae mollis. Curabitur
          elementum, nisl quis iaculis ultricies, sapien felis consequat orci,
          in tempor dui sem quis neque. Donec pretium suscipit euismod. Aenean
          condimentum orci vitae ultrices malesuada. Vestibulum vitae neque nec
          lectus mollis bibendum.
        </p>
        <p>
          Quisque et nisl sed tellus porttitor volutpat. Morbi eget ligula
          neque. Etiam rhoncus massa finibus arcu gravida sodales. Maecenas arcu
          mi, sollicitudin vel lacus vitae, aliquet porttitor massa. Aenean
          accumsan nisi ac suscipit maximus. Duis vitae augue at lacus suscipit
          vestibulum. Donec aliquet eleifend nisi, sit amet eleifend dolor
          ornare at. Sed magna est, faucibus at leo quis, hendrerit dignissim
          augue.
        </p>
      </div>
    </section>
  );
};

export default Lorem;
